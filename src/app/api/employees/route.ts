import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const employees = await prisma.employee.findMany({
    orderBy: { employeeId: 'asc' }
  })
  return NextResponse.json(employees)
}

export async function POST(request: Request) {
  const data = await request.json()
  const employee = await prisma.employee.create({
    data: {
      employeeId: data.employeeId,
      name: data.name,
      email: data.email || null,
      phone: data.phone || null,
      department: data.department || null,
      departmentCode: data.departmentCode || null,
      team: data.team || null,
      status: data.status || '在職',
      hireDate: data.hireDate ? new Date(data.hireDate) : null,
      quitDate: data.quitDate ? new Date(data.quitDate) : null,
      notes: data.notes || null
    }
  })
  return NextResponse.json(employee)
}
