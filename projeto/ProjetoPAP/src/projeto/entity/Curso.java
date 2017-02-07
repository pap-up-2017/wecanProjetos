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
public class Curso {
	
	// tag para indicar o id da classe
	@Id
	// geração de ids
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idCurso;
	
	private String nomeCurso;
	@ManyToOne
	private InstituicaoEnsino instituicaoCurso;
	
	public int getIdCurso() {
		return idCurso;
	}
	public void setIdCurso(int idCurso) {
		this.idCurso = idCurso;
	}
	public String getNomeCurso() {
		return nomeCurso;
	}
	public void setNomeCurso(String nomeCurso) {
		this.nomeCurso = nomeCurso;
	}
	public InstituicaoEnsino getInstituicaoCurso() {
		return instituicaoCurso;
	}
	public void setInstituicaoCurso(InstituicaoEnsino instituicaoCurso) {
		this.instituicaoCurso = instituicaoCurso;
	}

}
