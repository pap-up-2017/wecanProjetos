package projeto.entity;

import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
public class TokenAcesso {
	
	private int idUserLogged;
	private String typeUserLogged;
	
	public int getIdUserLogged() {
		return idUserLogged;
	}
	public void setIdUserLogged(int idUserLogged) {
		this.idUserLogged = idUserLogged;
	}
	public String getTypeUserLogged() {
		return typeUserLogged;
	}
	public void setTypeUserLogged(String typeUserLogged) {
		this.typeUserLogged = typeUserLogged;
	}
	
}
