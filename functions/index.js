const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// CREATE NEW USER IN FIREBASE BY FUNCTION
exports.createUser = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().createUser({
      email: data.email,
      emailVerified: true,
      password: data.password,
      displayName: data.displayName,
      disabled: false,
    });
    return {
      response: user
    };
} catch (error) {
    throw new functions.https.HttpsError('failed to create a user');
  }
});

// DELETE USER IN FIREBASE BY FUNCTION
exports.deleteUser = functions.https.onCall(async (uid) => {
  try {
    await admin.auth().deleteUser(uid).then(() => {
      return 'Usuário deletado com sucesso';
    })
    .catch((error) => {
      return error;
    });
} catch (error) {
    throw new functions.https.HttpsError('failed to create a user');
  }
});