import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await request.json()
  const employee = await prisma.employee.update({
    where: { id },
    data: {
      employeeId: data.employeeId,
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      department: data.department || null,
      departmentCode: data.departmentCode || null,
      team: data.team || null,
      status: data.status,
      hireDate: data.hireDate ? new Date(data.hireDate) : null,
      quitDate: data.quitDate ? new Date(data.quitDate) : null,
      notes: data.notes || null
    }
  })
  return NextResponse.json(employee)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.employee.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
