const express = require('express');
const middleware = require('../middlewares/user');
/**
 * @apiDefine InvalidInputErrorExample
 * @apiErrorExample {json} Invalid Input
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "code": 104,
 *     "error": "missing_required_data"
 *   }
 */
/**
 * @apiDefine EmailExistsError
 * @apiError (Error: EmailExists 400) EmailExists <code>email</code> already found in the system.
 * @apiErrorExample {json} Email Exists
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "code": 101,
 *     "error": "email_already_exists"
 *   }
 */
/**
 * @apiDefine AccessTokenParams
 * @apiHeader {String} X-Access-Token the token of the user that is used to identify the user. A request must contain a Header or Param to be authorized.
 */
/**
 * @apiDefine AuthRequiredError
 * @apiError (Error: Authorization Required 401) AuthRequired <code>token</code> is not valid.
 * @apiErrorExample {json} Authorization Required
 *   HTTP/1.1 401 Authorization Required
 *   {
 *     "code": 401,
 *     "error": "authentication_required",
 *   }
 */
/**
 * @apiDefine GetListParams
 * @apiParam (Query) {Number} [offset] The offset of the result
 * @apiParam (Query) {Number} [limit] Number of results per page
 */

const router = express.Router();


/**
 * @api {post} /users/login Login to the APP
 * @apiName userLogin
 * @apiGroup Users
 *
 * @apiParam (Body) {String} email The user's email
 * @apiParam (Body) {String} password The password
 *
 * @apiSuccess {User} user The logged in user info
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * {
 * "email" : "admin@admin.com",
 * "firstName" : "Admin",
 * "lastName" : "Admin",
 * "role" : "client",
 * "language" : "en",
 * "isActive" : false,
 * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTc0ZThhNzJmMjg2N2FlMmNkNTcxNyIsImlhdCI6MTQ5NDg4Mjk4NX0.LlfZSHBUDSnS6qD8tXPjUJuJQAzCbkC-PbYOyDagyz8"
 * }
 * @apiError (Error: IncorrectCredentials 400) IncorrectCredentials The <code>username</code> or <code>password</code> is invalid.
 * @apiErrorExample {json} Incorrect Credentials
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "code": 106,
 *     "error": "number_password_incorrect"
 *   }
 * @apiError (Error: UserInactive 401) UserInactive The user is inactive.
 * @apiErrorExample {json} User Inactive
 *   HTTP/1.1 401 Unauthorized
 *   {
 *     "code": 304,
 *     "error": "user_inactive"
 *   }
 */
router.post('/login', middleware.login);

//the rest need to check login first !!
router.use(middleware.checkLogin);

/**
 * @api {get} /users/me Get the logged in user
 * @apiName CMSGetMe
 * @apiGroup Users
 *
 * @apiUse AccessTokenParams
 * @apiSuccess {User} user The logged in user
 * @apiUse AuthRequiredError
 */
router.get('/me', middleware.getCurrentUser)
/**
 * @api {post} /users/signup signup with email & password
 * @apiName UserSignup
 * @apiGroup Users
 *
 * @apiParam (Body) {String} firstName The user's first name
 * @apiParam (Body) {String} lastName The user's last name
 * @apiParam (Body) {String='en','ar'} language The user's language device, the default is <code>en</code>
 * @apiParam (Body) {String} email The user's email
 * @apiParam (Body) {String} password The password
 * @apiParamExample {json} Sample Params
 * {
 * "email" : "admin@admin.com",
 * "firstName" : "Admin",
 * "lastName" : "Admin",
 * "language" : "en"
 * }
 *
 * @apiSuccess {User} user The logged in user
 * @apiSuccessExample {json} Success Response
 *   HTTP/1.1 200 OK
 * {
 * "email" : "admin@admin.com",
 * "firstName" : "Admin",
 * "lastName" : "Admin",
 * "role" : "client",
 * "language" : "en",
 * "isActive" : false,
 * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MTc0ZThhNzJmMjg2N2FlMmNkNTcxNyIsImlhdCI6MTQ5NDg4Mjk4NX0.LlfZSHBUDSnS6qD8tXPjUJuJQAzCbkC-PbYOyDagyz8"
 * }
 *
 * @apiError (Error: InvalidInput 400) MissingInfo <code>name</code>, <code>email</code>, <code>password</code> or are not specified.
 * @apiUse InvalidInputErrorExample
 * @apiUse EmailExistsError
 */
  .post('/signup', middleware.createUser);


module.exports = router;
