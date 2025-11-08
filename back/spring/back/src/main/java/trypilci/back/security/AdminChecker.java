package trypilci.back.security;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("adminChecker")
public class AdminChecker {

    private final AdminProperties adminProperties;

    public AdminChecker(AdminProperties adminProperties) {
        this.adminProperties = adminProperties;
    }

    public boolean isAdmin(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            return false;
        }
        String email = authentication.getName(); // email from UsernamePasswordAuthenticationToken
        return adminProperties.getEmail().contains(email);
    }
}

