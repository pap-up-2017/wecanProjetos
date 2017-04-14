package projeto.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
//tag para o hibernate
@Entity
public class Resposta {
	
	// tag para indicar o id da classe
	@Id
	// geração de ids
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idResposta;
	private String textoResposta;
	@ManyToOne
	private Feed feedResposta;
	
	public int getIdResposta() {
		return idResposta;
	}
	public void setIdResposta(int idResposta) {
		this.idResposta = idResposta;
	}
	public String getTextoResposta() {
		return textoResposta;
	}
	public void setTextoResposta(String textoResposta) {
		this.textoResposta = textoResposta;
	}
	public Feed getFeedResposta() {
		return feedResposta;
	}
	public void setFeedResposta(Feed feedResposta) {
		this.feedResposta = feedResposta;
	}
}
