import { connectDB, disconnectDB } from "@config/database";
import { EventService } from "@modules/features/competition/event/event.service";

const loadOneCompetition = async () => {
  await EventService.create({
    name: "Post any Engaging content",
    description:
      "Post any Content in Write/share section or CampusBuxx get engagement Like/Comment or quality content more engagement your content will get you will get more score",
    rules: [
      "Don't Post any inAppropriate content",
      "Posting of any inAppropriate content can make you your account Blocked",
    ],
    prizes: [
      { position: "1", amount: 2000, description: "With CampusX Certificate" },
      { position: "2", amount: 1000, description: "With CampusX Certificate" },
      { position: "3", amount: 500, description: "With CampusX Certificate" },
    ],
    startDate: Date.parse("2025-01-05"),
    endDate: Date.parse("2025-01-26"),
    category: "General",
    status: "ONGOING",
    organizer: "CampusX",
    posterUrl:
      "https://amazon-s3-bucket-campusx.s3.amazonaws.com/dev/b2709944-3469-42c1-9601-b0b414cf5c43.jpg",
  });

  console.log("Seeded one event in competitions.");
};

const run = async () => {
  await connectDB();

  await loadOneCompetition();

  await disconnectDB();
};

run();
