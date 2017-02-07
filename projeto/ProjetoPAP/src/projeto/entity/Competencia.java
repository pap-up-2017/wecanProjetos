package projeto.entity;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
//tag para o hibernate reconhecer que deve mapear essa classe
@Entity
public class Competencia {
	
	// tag para indicar o id da classe
	@Id
	// indica para que o id seja criado automaticamente.
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idCompetencia;
	private String nomeCompetencia;
	
	public int getIdCompetencia() {
		return idCompetencia;
	}
	public void setIdCompetencia(int idCompetencia) {
		this.idCompetencia = idCompetencia;
	}
	public String getNomeCompetencia() {
		return nomeCompetencia;
	}
	public void setNomeCompetencia(String nomeCompetencia) {
		this.nomeCompetencia = nomeCompetencia;
	}
	


	


}
