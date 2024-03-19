import type { JwtCustomizerUserContext } from '@logto/schemas';
import { userInfoSelectFields, jwtCustomizerUserContextGuard } from '@logto/schemas';
import { deduplicate, pick, pickState } from '@silverhand/essentials';

import { type ScopeLibrary } from '#src/libraries/scope.js';
import { type UserLibrary } from '#src/libraries/user.js';
import type Queries from '#src/tenants/Queries.js';

// Show top 20 organization roles.
const limit = 20;
const offset = 0;

export const createJwtCustomizerLibrary = (
  queries: Queries,
  userLibrary: UserLibrary,
  scopeLibrary: ScopeLibrary
) => {
  const {
    users: { findUserById },
    rolesScopes: { findRolesScopesByRoleIds },
    scopes: { findScopesByIds },
    userSsoIdentities,
    organizations: { relations, roles: organizationRoles },
  } = queries;
  const { findUserRoles } = userLibrary;
  const { attachResourceToScopes } = scopeLibrary;

  const getUserContext = async (userId: string): Promise<JwtCustomizerUserContext> => {
    const user = await findUserById(userId);
    const fullSsoIdentities = await userSsoIdentities.findUserSsoIdentitiesByUserId(userId);
    const roles = await findUserRoles(userId);
    const rolesScopes = await findRolesScopesByRoleIds(roles.map(({ id }) => id));
    const scopeIds = rolesScopes.map(({ scopeId }) => scopeId);
    const scopes = await findScopesByIds(scopeIds);
    const scopesWithResources = await attachResourceToScopes(scopes);
    const organizationsWithRoles = await relations.users.getOrganizationsByUserId(userId);
    const [_, organizationRolesWithScopes] = await organizationRoles.findAll(limit, offset);
    const userContext = {
      ...pick(user, ...userInfoSelectFields),
      ssoIdentities: fullSsoIdentities.map(pickState('issuer', 'identityId', 'detail')),
      mfaVerificationFactors: deduplicate(user.mfaVerifications.map(({ type }) => type)),
      roles: roles.map((role) => {
        const scopeIds = new Set(
          rolesScopes.filter(({ roleId }) => roleId === role.id).map(({ scopeId }) => scopeId)
        );
        return {
          ...pick(role, 'id', 'name', 'description'),
          scopes: scopesWithResources
            .filter(({ id }) => scopeIds.has(id))
            .map(pickState('id', 'name', 'description', 'resourceId', 'resource')),
        };
      }),
      organizations: organizationsWithRoles.map(pickState('id', 'name', 'description')),
      organizationRoles: organizationsWithRoles.flatMap(
        ({ id: organizationId, organizationRoles }) =>
          organizationRoles.map(({ id: roleId, name: roleName }) => ({
            organizationId,
            roleId,
            roleName,
            scopes: organizationRolesWithScopes.find(({ id }) => id === roleId)?.scopes ?? [],
          }))
      ),
    };

    return jwtCustomizerUserContextGuard.parse(userContext);
  };

  return {
    getUserContext,
  };
};
