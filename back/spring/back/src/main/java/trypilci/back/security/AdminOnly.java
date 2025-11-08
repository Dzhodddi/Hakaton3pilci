package trypilci.back.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("@adminChecker.isAdmin(authentication)")
public @interface AdminOnly {
}

