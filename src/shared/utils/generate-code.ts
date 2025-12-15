export const generateReferralCode = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let referralCode = "";
  for (let i = 0; i < length; i++)
    referralCode += chars.charAt(Math.floor(Math.random() * chars.length));
  return referralCode;
};
