import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const logs = await prisma.assetLog.findMany({
    include: { asset: true, employee: true },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(logs)
}

export async function POST(request: Request) {
  const data = await request.json()
  const log = await prisma.assetLog.create({
    data: {
      assetId: data.assetId,
      employeeId: data.employeeId || null,
      actionType: data.actionType,
      actionDate: data.actionDate ? new Date(data.actionDate) : null,
      notes: data.notes || null
    }
  })
  return NextResponse.json(log)
}
