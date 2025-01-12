-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "deadline" TIMESTAMP(3),
    "predictedTime" INTEGER,
    "dateToFinish" TIMESTAMP(3),
    "cycles" INTEGER,
    "workTime" INTEGER,
    "breakTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
