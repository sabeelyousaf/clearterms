//Auth
const login = "http://localhost:8000/api/login"
const register = "http://localhost:8000/api/register"
const profileUpdate = "http://localhost:8000/api/profile-update"


//Stripe
const checkSubscription="http://localhost:8000/api/check-subscription"
const checkoutSession="http://localhost:8000/api/create-checkout-session"

//Docs
const allDocs="http://localhost:8000/api/docs"
const singleDoc="http://localhost:8000/api/doc"
const uploadDoc="http://localhost:8000/api/doc/upload"


//AI
const docSummarize="http://localhost:8000/api/doc/summarize"
const docSimplify="http://localhost:8000/api/doc/simplify"



export {login, register ,checkSubscription,checkoutSession,allDocs,uploadDoc,docSummarize,docSimplify,profileUpdate,singleDoc}