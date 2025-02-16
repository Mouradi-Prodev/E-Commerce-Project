package com.eilco.e_commerce.config;

import com.eilco.e_commerce.dto.ErrorDto;
import com.eilco.e_commerce.exceptions.AppException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = { AppException.class })
    @ResponseBody
    public ResponseEntity<ErrorDto> handleException(AppException ex) {
        return ResponseEntity
                .status(ex.getHttpStatus())
                .body(new ErrorDto(ex.getMessage()));
    }
}
