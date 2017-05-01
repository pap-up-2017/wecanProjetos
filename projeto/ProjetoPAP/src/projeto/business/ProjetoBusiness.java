package projeto.business;

import java.util.ArrayList;
import java.util.List;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceProjetoDao;
import projeto.dao.TarefaDao;
import projeto.entity.Projeto;
import projeto.entity.Tarefa;
import projeto.entity.Usuario;
import projeto.util.Datas;

public class ProjetoBusiness {
	
	public String create (Projeto p){
		int id = 0;
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		if (p.getIdProjeto() < 1){
			// Registro a quantidade de participantes mais o organizador
			p.setParticipantes(p.getUsuarios().size()+1);
			p.setDataCriacao(Datas.retornaDataAtual());
			p.setStatus("Aberto");
			id = dao.salvar(p);
			
			FeedBusiness fBus = new FeedBusiness();
			fBus.create(id);
		}
		
		
		return ""+ id;
	}
	
	// inicia o projeto
	public String inciar(int id){
		
		Projeto p;
		
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		try{
			p = dao.getObjById(id);
		}catch(Exception ex){
			return "projeto não encontrado";
		}
		
		p.setStatus("Em andamento");
		dao.alterar(p);
		return "Projeto iniciado com sucesso."; 
	}
	
	// Concluir projeto
	public String concluir(int id){
		boolean concluido = true;
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		TarefaDao daoT = FactoryDao.createTarefaDao();
		Projeto p = dao.getObjById(id);
		List<Tarefa> tarefas = daoT.listarPorProjeto(p.getIdProjeto());
		// verifica se há tarefas
		if(!(tarefas.size() > 0)){
			concluido = false;
			return "Seu projeto ainda não possui tarefas";
		}
		else{
			// verifica se todas as tarefas foram concluídas
			for(Tarefa t : tarefas){
				if(!(t.getStatusTarefa().equals("Concluído"))){
					concluido = false;
					return "Todas as tarefas devem estar concluídas";
				}
			}
		}
		if(concluido){
			p.setStatus("Concluído");
			dao.alterar(p);
			return "Projeto concluído com sucesso."; 
		}
		return null;
	}

	public List<Projeto> projetosPorUsuario(int id){
		List<Projeto> projetosUsuario = new ArrayList<Projeto>();
		InterfaceProjetoDao<Projeto> dao = FactoryDao.createProjetoDao();
		List<Projeto> projetosBanco = dao.listar();
		System.out.println("Id usuario para pesquisa: "+id);
		for(Projeto p : projetosBanco){
			if(p.getOrganizador().getIdUsuario() == id){
				projetosUsuario.add(p);
			}else{
				for(Usuario u : p.getUsuarios()){
					if(u.getIdUsuario() == id){
						projetosUsuario.add(p);
					}
				}
			}
		}
		return projetosUsuario;
	}
}
