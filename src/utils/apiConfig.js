const token = '608b1e33-0a63-4dca-95e8-d83ced1bfb4a';
const cohortId = 'cohort-66';

export const apiConfig = {
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
};
