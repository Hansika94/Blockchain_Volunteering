// File for defining different routes.
// Refer to gitub.com/fridays/next-routes.
// () means that a function is invoked after the require.
const routes = require('next-routes')();

// New route mapping with add(), pattern that we look for and that the file
routes
    .add('/index', '/index')
    .add('/stats', '/stats')
    .add('/createTokens', '/createTokens')
    .add(`/auth/signIn`, '/auth/signIn')
    .add(`/auth/signUpVolunteer`, '/auth/signUpVolunteer')
    .add(`/auth/signUpOrg`, '/auth/signUpOrg')
    .add(`/auth/profile`, '/auth/profile')
    .add(`/approve/approveOrg`, '/approve/approveOrg')

module.exports = routes;