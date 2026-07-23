"use server";

import { createSession, deleteSession, decrypt } from "@/lib/session";
import { cookies } from "next/headers";

const API_URL = "http://treinamentoapi.codejr.com.br/api";

export async function register(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Todos os campos são obrigatórios." };
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await res.json();

    if (!res.ok || json.status !== 201) {
      return { error: json.message || "Erro ao registrar usuário." };
    }

    await createSession(json.user.id, json.user.email, json.user.name, null);
    
    const cookieStore = await cookies();
    cookieStore.set("auth_token", json.token, { httpOnly: true, path: "/" });

    return { success: true };
  } catch (error) {
    return { error: "Erro de conexão com a API." };
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "E-mail e senha são obrigatórios." };
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (!res.ok || (json.status !== 200 && json.status !== 201)) {
      return { error: json.message || "Credenciais inválidas." };
    }

    await createSession(json.user.id, json.user.email, json.user.name, null);
    
    const cookieStore = await cookies();
    cookieStore.set("auth_token", json.token, { httpOnly: true, path: "/" });

    return { success: true };
  } catch (error) {
    return { error: "Erro de conexão com a API." };
  }
}

export async function logout() {
  await deleteSession();
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  return { success: true };
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  const payload = await decrypt(session);
  if (!payload) return null;

  return {
    email: payload.email,
    name: payload.name,
    photo: payload.photo,
  };
}
