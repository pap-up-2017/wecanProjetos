package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.AvaliacaoUsuario;
import projeto.entity.Tarefa;

public class AvaliacaoUsuarioDao {
	
	// cria a instancia
		EntityManager em = SingletonConection.getInstance();

		public void salvar(AvaliacaoUsuario t) {
			// inicia a instancia
			em.getTransaction().begin();
			// persiste os dados 
			em.persist(t);
			// envia os dados
			em.getTransaction().commit();
			// fecha a instancia
			em.close();
		}

		public List<AvaliacaoUsuario> listar() {
			// cria a Query para encontrar os itens
			Query q = em.createQuery("from AvaliacaoUsuario");
			// retorna os dados encontrados
			return q.getResultList();
		}

		public AvaliacaoUsuario getObjById(int id) {
			// cria a Query para encontrar de acordo com o id
			Query q = em.createQuery("from AvaliacaoUsuario where id = " + id);
			return (AvaliacaoUsuario) q.getSingleResult();
		}
		
		public List<AvaliacaoUsuario> listarPorProjeto (int idProjeto){
			Query q = em.createQuery("from AvaliacaoUsuario where projeto_idProjeto = " + idProjeto);
			return q.getResultList();
		}
		
		public List<AvaliacaoUsuario> listarPorUsuario (int idUsuario){
			Query q = em.createQuery("from AvaliacaoUsuario where usuarioAvaliado_idUsuario = " + idUsuario);
			return q.getResultList();
		}
		
		public List<AvaliacaoUsuario> listarPorProjetoAndUsuario(int idUsuario, int idProjeto) {
			// cria a instancia
			EntityManager em = SingletonConection.getInstance();
			// cria a Query para as avaliacoes
			Query q = em.createQuery("from AvaliacaoUsuario where usuarioAvaliado_idUsuario = "+idUsuario+
															" AND projeto_idProjeto = "+idProjeto);
			// retorna os dados encontrados
			return q.getResultList();
		}

		public void alterar(AvaliacaoUsuario t) {
			// inicia a instancia
			em.getTransaction().begin();
			// da um merge nos dados
			em.merge(t);
			// envia os dados
			em.getTransaction().commit();
			// fecha a instancia
			em.close();
		}

		public void excluir(AvaliacaoUsuario t) {
			// inicia a instancia
			em.getTransaction().begin();
			// cria uma query para para exclusão do objeto no banco..
			em.createQuery("DELETE FROM AvaliacaoUsuario WHERE id=" + t.getId()).executeUpdate();
			// envia os dados
			em.getTransaction().commit();
			// fecha a instancia
			em.close();
		}
}
