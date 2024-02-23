import mongoose from "mongoose";
import IbetaDownloadLink from "../types/betaDownloadLink";
const betaDownloadLinkSchema = new mongoose.Schema<IbetaDownloadLink>({
  link: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IbetaDownloadLink>(
  "betaVersions",
  betaDownloadLinkSchema
);
