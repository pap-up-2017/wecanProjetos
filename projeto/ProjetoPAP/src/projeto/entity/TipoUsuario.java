package projeto.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
//hibernate
@Entity
public class TipoUsuario {
	
	// tag hibernate
	@Id
	// geração de ids
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idTipoUsuario;
	private String tipoUsuario;
	
	public int getIdTipoUsuario() {
		return idTipoUsuario;
	}
	public void setIdTipoUsuario(int idTipoUsuario) {
		this.idTipoUsuario = idTipoUsuario;
	}
	public String getTipoUsuario() {
		return tipoUsuario;
	}
	public void setTipoUsuario(String tipoUsuario) {
		this.tipoUsuario = tipoUsuario;
	}
}
