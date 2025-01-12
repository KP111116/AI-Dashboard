import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { InvalidEvent } from "react";

export async function GET(){
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
}

export async function POST(req: Request) {
    try {
      const data = await req.json();
  
      console.log('Received payload:', data);
  
      // Clean payload to ensure valid data
      const cleanedData = {
        name: data.name,
        description: data.description,
        category: data.category,
        deadline: data.deadline ? new Date(data.deadline) : null,
        predictedTime: data.predictedTime || null,
        dateToFinish: data.dateToFinish ? new Date(data.dateToFinish) : null,
        cycles: data.cycles || null,
        workTime: data.workTime || null,
        breakTime: data.breakTime || null,
        createdAt: new Date(), // Ensure createdAt is always set
      };
  
      console.log('Cleaned payload:', cleanedData);
  
      const newTask = await prisma.task.create({
        data: cleanedData,
      });
  
      console.log('Created task:', newTask);
      return NextResponse.json(newTask);
    } catch (error: any) {
      console.error('Error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }