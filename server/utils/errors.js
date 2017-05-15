module.exports = {
  authRequiredError: {
    error: 'authentication_required',
    code: 401,
    status: 401
  },
  unauthorizedError: {
    error: 'unauthorized',
    code: 403,
    status: 403
  },
  users: {
    emailExists: {
      error: 'email_already_exists',
      code: 101,
      status: 400
    },
    phoneNumberExists: {
      error: 'phone_number_already_exists',
      code: 102,
      status: 400
    },
    phoneNumberInvalid: {
      error: 'invalid_phone_number',
      code: 103,
      status: 400
    },
    invalidInput: {
      error: 'missing_required_data',
      code: 104,
      status: 400
    },
    notFound: {
      error: 'user_not_found',
      code: 105,
      status: 404
    },
    incorrectCreds: {
      error: 'number_password_incorrect',
      code: 106,
      status: 400
    },
    emailNotFound: {
      error: 'email_not_found',
      code: 107,
      status: 404
    },
    phoneNumberNotFound: {
      error: 'phone_number_not_found',
      code: 108,
      status: 404
    },
    verificationFailed: {
      error: 'verification_failed',
      code: 109,
      status: 400
    },
    notVerified: {
      error: 'user_not_verified',
      code: 110,
      status: 403
    },
    oldPasswordIncorrect: {
      error: 'old_password_incorrect',
      code: 111,
      status: 400
    },
    verificationExpired: {
      error: 'verification_expired',
      code: 112,
      status: 400
    },
    invalidEmail: {
      error: 'invalid_email',
      code: 113,
      status: 400
    }
  },
  shops: {
    invalidLocation: {
      error: 'lat_long_required',
      code: 201,
      status: 400
    },
    notFound: {
      error: 'shop_not_found',
      code: 202,
      status: 404
    },
    phoneNumberExists: {
      error: 'phone_number_already_exists',
      code: 203,
      status: 400
    },
    requestNotPending: {
      error: 'request_not_pending',
      code: 204,
      status: 400
    },
    wholesalerRequired: {
      error: 'wholesaler_required',
      code: 205,
      status: 400
    }
  },
  cmsUsers: {
    emailExists: {
      error: 'email_already_exists',
      code: 101,
      status: 400
    },
    phoneNumberExists: {
      error: 'phone_number_already_exists',
      code: 102,
      status: 400
    },
    cannotDeactivate: {
      error: 'cannot_deactivate',
      code: 301,
      status: 400
    },
    nameExists: {
      error: 'name_already_exists',
      code: 302,
      status: 400
    },
    cannotUpdateAdmin: {
      error: 'cannot_modify_admin',
      code: 303,
      status: 400
    },
    userInactive: {
      error: 'user_inactive',
      code: 304,
      status: 401
    },
    notFound: {
      error: 'user_not_found',
      code: 305,
      status: 404
    },
    alreadyVerified: {
      error: 'user_already_verified',
      code: 306,
      status: 400,
    },
    tokenExpired: {
      error: 'token_expired',
      code: 307,
      status: 400
    }
  },
  oilChangeService: {
    invalidInput: {
      error: 'missing_required_data',
      code: 601,
      status: 400
    },
    invalidCode: {
      error: 'invalid_code',
      code: 602,
      status: 400
    },
    serviceFinished: {
      error: 'service_already_finished',
      code: 603,
      status: 400
    },
    cantCancel: {
      error: 'cant_cancel_service',
      code: 604,
      status: 400
    },
    notFound: {
      error: 'service_not_found',
      code: 605,
      status: 404
    },
    sdkError: {
      error: 'sdk_token_error',
      code: 606,
      status: 500
    },
    alreadyPaid: {
      error: 'Service is already paid',
      code: 607,
      status: 400
    }
  },
  cars: {
    carNotFound: {
      error: 'car_not_found',
      code: 701,
      status: 400
    }
  }
};
