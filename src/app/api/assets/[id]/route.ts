import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await request.json()
  const asset = await prisma.asset.update({
    where: { id },
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
      status: data.status,
      notes: data.notes || null,
      employeeId: data.employeeId || null
    }
  })
  return NextResponse.json(asset)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.asset.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
