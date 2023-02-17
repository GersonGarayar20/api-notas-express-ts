import express from "express";

declare global {
	namespace Express {
		interface Request {
			// rome-ignore lint/suspicious/noExplicitAny: <explanation>
			user?: any;
		}
	}
}
