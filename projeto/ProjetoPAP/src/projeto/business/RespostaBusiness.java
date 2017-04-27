package projeto.business;

import java.util.ArrayList;
import java.util.List;

import projeto.dao.FactoryDao;
import projeto.dao.InterfaceDao;
import projeto.entity.Resposta;
import projeto.entity.Usuario;
import projeto.util.Datas;

public class RespostaBusiness {
	
	public void create(Resposta r, int idUsuario)	{
		r.setDataResposta(Datas.retornaDataAtual());
		InterfaceDao<Resposta> daoResposta = FactoryDao.createRespostaDao();
		InterfaceDao<Usuario> userDao = FactoryDao.createUsuarioDao();	
		r.setUsuarioResposta(userDao.getObjById(idUsuario));
		daoResposta.salvar(r);
	}
	
	public List<Resposta> buscaRespostasFeed(int idFeed){
		List<Resposta> respostasProjeto = new ArrayList<Resposta>();
		InterfaceDao<Resposta> dao = FactoryDao.createRespostaDao();
		List<Resposta> respostas = dao.listar();	
		for(Resposta r : respostas){
			if(r.getFeedResposta().getIdFeed() == idFeed){
				respostasProjeto.add(r);
			}
		}
		return respostasProjeto;
	}
}
