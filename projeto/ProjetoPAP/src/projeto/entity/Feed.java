package projeto.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
//tag para o hibernate
@Entity
public class Feed {
	
	// tag para indicar o id da classe
	@Id
	// geração de ids
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idFeed;
	private String tituloFeed;
	private String textoFeed;
	
	public int getIdFeed() {
		return idFeed;
	}
	public void setIdFeed(int idFeed) {
		this.idFeed = idFeed;
	}
	public String getTituloFeed() {
		return tituloFeed;
	}
	public void setTituloFeed(String tituloFeed) {
		this.tituloFeed = tituloFeed;
	}
	public String getTextoFeed() {
		return textoFeed;
	}
	public void setTextoFeed(String textoFeed) {
		this.textoFeed = textoFeed;
	}
}
