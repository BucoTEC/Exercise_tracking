import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import dotenv from "dotenv";

dotenv.config();

const googleClId = process.env.GOOGLE_CLIENT_ID || "dummyid";

const googleClSecret = process.env.GOOGLE_CLIENT_SECRET || "dummysecret";

passport.use(
	new GoogleStrategy.Strategy(
		{
			clientID: googleClId,
			clientSecret: googleClSecret,
			callbackURL: "http://localhost:5000/api/auth/google/cal",
			passReqToCallback: true,
		},
		function (req: any, token: any, tokenSecret: any, profile: any, done: any) {
			req.user = profile;
			done(null, profile);
		}
	)
);
