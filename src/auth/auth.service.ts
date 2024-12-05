import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseAdminService {
  constructor () {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
    });

    // for testing purposes
    // admin.auth().createCustomToken('XXX', { role: 'author' }).then((res) => {
    //   console.log(res);
    // });
  }

  async verifyToken(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken; // Contains `role` and other claims if set
    } catch (error) {
      throw new Error('Invalid Firebase token');
    }
  }

  async setCustomClaims(uid: string, claims: Record<string, any>) {
    await admin.auth().setCustomUserClaims(uid, claims);
  }
}