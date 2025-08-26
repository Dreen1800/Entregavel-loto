import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'
import { createClient } from '@/lib/supabase/server'

// Chave secreta para validar o webhook (adicionar no .env)
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'seu-webhook-secret-aqui'

interface WebhookPayload {
  email: string
  name: string
  loto_gains_10x_access?: boolean
  loto_turbo_access?: boolean
  action?: 'create' | 'update' | 'delete'
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação via header
    const authHeader = request.headers.get('authorization')
    const webhookSecret = request.headers.get('x-webhook-secret')
    
    // Validar autenticação
    if (!webhookSecret || webhookSecret !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid webhook secret' },
        { status: 401 }
      )
    }

    // Parse do payload
    const payload: WebhookPayload = await request.json()
    
    // Validar campos obrigatórios
    if (!payload.email || !payload.name) {
      return NextResponse.json(
        { error: 'Missing required fields: email and name' },
        { status: 400 }
      )
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(payload.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Usar client server-side do Supabase para operações seguras
    const serverSupabase = createClient()
    
    const action = payload.action || 'create'
    
    switch (action) {
      case 'create':
        return await handleCreateUser(serverSupabase, payload)
      
      case 'update':
        return await handleUpdateUser(serverSupabase, payload)
      
      case 'delete':
        return await handleDeleteUser(serverSupabase, payload)
      
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: create, update, or delete' },
          { status: 400 }
        )
    }

  } catch (error: any) {
    console.error('Webhook error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

async function handleCreateUser(supabase: any, payload: WebhookPayload) {
  try {
    // Verificar se usuário já existe
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('email', payload.email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { 
          message: 'User already exists',
          user: existingUser 
        },
        { status: 200 }
      )
    }

    // Criar novo usuário
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{
        email: payload.email,
        name: payload.name,
        loto_gains_10x_access: payload.loto_gains_10x_access || false,
        loto_turbo_access: payload.loto_turbo_access || false
      }])
      .select()
      .single()

    if (insertError) {
      throw insertError
    }

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: newUser 
      },
      { status: 201 }
    )

  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`)
  }
}

async function handleUpdateUser(supabase: any, payload: WebhookPayload) {
  try {
    // Atualizar usuário existente
    const updateData: any = {
      name: payload.name
    }

    // Apenas atualizar campos de acesso se fornecidos
    if (payload.loto_gains_10x_access !== undefined) {
      updateData.loto_gains_10x_access = payload.loto_gains_10x_access
    }
    
    if (payload.loto_turbo_access !== undefined) {
      updateData.loto_turbo_access = payload.loto_turbo_access
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update(updateData)
      .eq('email', payload.email)
      .select()
      .single()

    if (updateError) {
      if (updateError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      throw updateError
    }

    return NextResponse.json(
      { 
        message: 'User updated successfully',
        user: updatedUser 
      },
      { status: 200 }
    )

  } catch (error: any) {
    throw new Error(`Failed to update user: ${error.message}`)
  }
}

async function handleDeleteUser(supabase: any, payload: WebhookPayload) {
  try {
    const { data: deletedUser, error: deleteError } = await supabase
      .from('users')
      .delete()
      .eq('email', payload.email)
      .select()
      .single()

    if (deleteError) {
      if (deleteError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
      throw deleteError
    }

    return NextResponse.json(
      { 
        message: 'User deleted successfully',
        user: deletedUser 
      },
      { status: 200 }
    )

  } catch (error: any) {
    throw new Error(`Failed to delete user: ${error.message}`)
  }
}

// Permitir apenas POST
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}