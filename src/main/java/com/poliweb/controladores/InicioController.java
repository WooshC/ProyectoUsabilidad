package com.poliweb.controladores;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/Inicio")
public class InicioController extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            request.getRequestDispatcher("/bienvenida.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();  // Puedes registrar el error en los logs si es necesario
            request.setAttribute("errorMessage", "Lo sentimos, hubo un error inesperado. Intenta nuevamente más tarde.");
            request.getRequestDispatcher("/errores.jsp").forward(request, response);
        }
    }
}