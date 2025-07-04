import { createClient } from '@supabase/supabase-js'

// 環境変数を取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// 環境変数のチェック（開発環境では警告のみ）
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set')
}

// 公開用クライアント（ブラウザでも使用可能）
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// サーバー専用クライアント（より高い権限）
export const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// データベースの型定義
export interface IdeaRecord {
  id?: number
  created_at?: string
  title: string
  category: string | null
  tags: string | null
  price_range: string | null
  duration: string | null
  source: string | null
  status: string
  slug: string
  notes: string | null
  mdx_content: string | null
  updated_at?: string
}