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
public class RespostaResposta {
	
	// tag para indicar o id da classe
	@Id
	// geração de ids
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idRespostaResposta;
	@ManyToOne
	private Resposta respostaPai;
	@ManyToOne
	private Resposta respostaFilho;
	
	public int getIdRespostaResposta() {
		return idRespostaResposta;
	}
	public void setIdRespostaResposta(int idRespostaResposta) {
		this.idRespostaResposta = idRespostaResposta;
	}
	public Resposta getRespostaPai() {
		return respostaPai;
	}
	public void setRespostaPai(Resposta respostaPai) {
		this.respostaPai = respostaPai;
	}
	public Resposta getRespostaFilho() {
		return respostaFilho;
	}
	public void setRespostaFilho(Resposta respostaFilho) {
		this.respostaFilho = respostaFilho;
	}	
}
