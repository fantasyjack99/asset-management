import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const assets = await prisma.asset.findMany({
    include: { employee: true },
    orderBy: { assetNumber: 'asc' }
  })
  return NextResponse.json(assets)
}

export async function POST(request: Request) {
  const data = await request.json()
  const asset = await prisma.asset.create({
    data: {
      assetNumber: data.assetNumber,
      assetType: data.assetType || null,
      brand: data.brand || null,
      model: data.model || null,
      serialNumber: data.serialNumber || null,
      computerName: data.computerName || null,
      ipAddress: data.ipAddress || null,
      macWireless: data.macWireless || null,
      macWired: data.macWired || null,
      status: data.status || '在用',
      notes: data.notes || null,
      employeeId: data.employeeId || null
    }
  })
  return NextResponse.json(asset)
}
