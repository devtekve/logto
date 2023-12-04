const connector = {
  general: '커넥터에서 오류가 발생했습니다: {{errorDescription}}',
  not_found: '{{type}} 값을 가진 연동 종류를 찾을 수 없어요.',
  not_enabled: '연동이 활성화되지 않았어요.',
  invalid_metadata: '연동 메타데이터가 유효하지 않아요.',
  invalid_config_guard: '연동 설정 데이터가 유효하지 않아요.',
  unexpected_type: '예상하지 않은 연동 종류에요.',
  invalid_request_parameters: '잘못된 요청 파라미터가 있어요.',
  insufficient_request_parameters: '요청 데이터에서 일부 정보가 없어요.',
  invalid_config: '연동 설정이 유효하지 않아요.',
  /** UNTRANSLATED */
  invalid_certificate:
    "The connector's certificate is invalid, please make sure the certificate is in PEM encoding.",
  invalid_response: '연동 응답이 유효하지 않아요.',
  template_not_found: '연동 예제 설정을 찾을 수 없어요.',
  template_not_supported: '연동이 이 템플릿 타입을 지원하지 않아요.',
  rate_limit_exceeded: '트리거 주기 제한. 나중에 다시 시도하세요.',
  not_implemented: '{{method}}은 아직 구현되지 않았어요.',
  social_invalid_access_token: '연동 서비스의 Access 토큰이 유효하지 않아요.',
  invalid_auth_code: '연동 서비스의 Auth 코드가 유효하지 않아요.',
  social_invalid_id_token: '연동 서비스의 ID 토큰이 유효하지 않아요.',
  authorization_failed: '사용자의 인증 과정이 성공적으로 마무리되지 않았어요.',
  social_auth_code_invalid: 'Access 토큰을 가져올 수 없어요. Authorization 코드를 확인해 주세요.',
  more_than_one_sms: 'SMS 서비스는 1개만 연동되어야 해요.',
  more_than_one_email: '이메일 서비스는 1개만 연동되어야 해요.',
  more_than_one_connector_factory:
    '다수의 커넥터 팩토리가 발견되었습니다 (ID {{connectorIds}}). 불필요한 팩토리는 제거해주세요.',
  db_connector_type_mismatch: '종류가 일치하지 않은 연동 서비스가 DB에 존재해요.',
  not_found_with_connector_id: '주어진 연동 ID로 연동 설정을 찾을 수 없어요.',
  multiple_instances_not_supported: '선택된 연동 기준으로 여러 인스턴스를 생성할 수 없어요.',
  invalid_type_for_syncing_profile: '소셜 연동만 사용자 프로파일을 동기화 할 수 있어요.',
  can_not_modify_target: '연동 목표를 수정할 수 없어요.',
  should_specify_target: "'목표'를 반드시 지정해야 해요.",
  multiple_target_with_same_platform: '같은 목표와 플랫폼에 여러 소셜 연동을 가질 수 없어요.',
  cannot_overwrite_metadata_for_non_standard_connector: '이 연동의 메타데이터를 덮어쓸 수 없어요.',
};

export default Object.freeze(connector);
