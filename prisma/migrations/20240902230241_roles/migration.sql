-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGET', 'CLIENT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CLIENT';
