package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.AvaliacaoUsuario;
import projeto.entity.ComentarioUsuario;

public class ComentarioUsuarioDao {
	
	// cria a instancia
	EntityManager em = SingletonConection.getInstance();	

	public void salvar(ComentarioUsuario t) {
		// inicia
		em.getTransaction().begin();
		// persiste
		em.persist(t);
		// envia
		em.getTransaction().commit();
		// fecha
		em.close();
	}

	public List<ComentarioUsuario> listar() {
		// cria a Query
		Query q = em.createQuery("from ComentarioUsuario");
		// retorna os dados encontrados
		return q.getResultList();
	}

	public ComentarioUsuario getObjById(int id) {
		// cria a Query para pesquisa de acordo com id
		Query q = em.createQuery("from ComentarioUsuario where id = " + id);
		return (ComentarioUsuario) q.getSingleResult();
	}
	
	// lista os comentarios que foram recebidos por um usuário
	public List<ComentarioUsuario> listarPorUsuarioQueRecebeComentario (int idUsuario){
		Query q = em.createQuery("from ComentarioUsuario where recebeComentario_idUsuario = " + idUsuario);
		return q.getResultList();
	}
	
	// lista os comentarios que foram gerados pelo usuário
	public List<ComentarioUsuario> listarPorUsuarioQuefazComentario (int idUsuario){
		Query q = em.createQuery("from ComentarioUsuario where enviaComentario_idUsuario = " + idUsuario);
		return q.getResultList();
	}
	
	// lista os comentarios que foram gerados no projeto
	public List<ComentarioUsuario> listarOsComentariosGeradosNoProjeto (int idProjeto){
		Query q = em.createQuery("from ComentarioUsuario where projetoComentario_idProjeto = " + idProjeto);
		return q.getResultList();
	}
	
	public void alterar(ComentarioUsuario t) {
		// inicia
		em.getTransaction().begin();
		// faz o merge
		em.merge(t);
		// envia
		em.getTransaction().commit();
		// fecha
		em.close();
	}

	public void excluir(ComentarioUsuario t) {
		// inicia
		em.getTransaction().begin();
		// cria uma query para para exclusão
		em.createQuery("DELETE FROM ComentarioUsuario WHERE id=" + t.getIdComentario()).executeUpdate();
		// envia
		em.getTransaction().commit();
		// fecha
		em.close();
	}

}
