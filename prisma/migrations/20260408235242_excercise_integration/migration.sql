-- CreateTable
CREATE TABLE "ExcerciseCategories" (
    "exCatId" SERIAL NOT NULL,
    "catname" TEXT NOT NULL,

    CONSTRAINT "ExcerciseCategories_pkey" PRIMARY KEY ("exCatId")
);

-- CreateTable
CREATE TABLE "exCatUser" (
    "exCatUId" SERIAL NOT NULL,
    "exCatId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateUsing" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exCatUser_pkey" PRIMARY KEY ("exCatUId")
);

-- AddForeignKey
ALTER TABLE "exCatUser" ADD CONSTRAINT "exCatUser_exCatId_fkey" FOREIGN KEY ("exCatId") REFERENCES "ExcerciseCategories"("exCatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exCatUser" ADD CONSTRAINT "exCatUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
