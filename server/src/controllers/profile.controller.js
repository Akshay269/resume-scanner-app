import Profile from "../models/Profile.js";

export const saveDraft = async (req, res) => {
  try {
    const { currentStep, formData } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        currentStep,
        formData,
        updatedAt: new Date()
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDraft = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const submitProfile = async (req, res) => {

};