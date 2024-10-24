"use server";
import prisma from "@/commons/lib/db";

// Function without 'async' to allow using '.then()'
export async function createContainer({ containerNumber, status, currentLocation }: { containerNumber: string, status: string, currentLocation: string }) {
  return prisma.container.create({
    data: {
      containerNumber,
      status,
      currentLocation,
    },
  });
}

export async function getContainers() {
  const containers = await prisma.container.findMany();
  return containers;
}
