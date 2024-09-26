-- CreateTable
CREATE TABLE "GeneratedText" (
    "id" SERIAL NOT NULL,
    "topic" TEXT NOT NULL,
    "levelB2" TEXT NOT NULL,
    "levelC2" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeneratedText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GeneratedText_topic_date_idx" ON "GeneratedText"("topic", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");
