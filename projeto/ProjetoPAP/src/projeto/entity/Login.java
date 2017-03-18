package projeto.entity;

import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
public class Login {
	
	private String usernameLogin;
	private String senhaUsername;
	
	public String getUsernameLogin() {
		return usernameLogin;
	}
	public void setUsernameLogin(String usernameLogin) {
		this.usernameLogin = usernameLogin;
	}
	public String getSenhaUsername() {
		return senhaUsername;
	}
	public void setSenhaUsername(String senhaUsername) {
		this.senhaUsername = senhaUsername;
	}
	
	
}
