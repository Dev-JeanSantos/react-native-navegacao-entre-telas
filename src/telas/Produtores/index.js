import React, {useState, useEffect} from 'react';
import { FlatList, Text, StyleSheet,  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Produtor from './componentes/Produtor';
import Topo from './componentes/Topo';
import useProdutores from '../../hooks/useProdutores';
import useTextos from '../../hooks/useTextos';

export default function Produtores({ melhoresProdutores }) {

  const navigation = useNavigation();
  const route = useRoute();
  const [exibirMensagem, setExibirMensagem] = useState(false);


  const lista = useProdutores(melhoresProdutores);
  const { tituloProdutores, mensagemCompra } = useTextos();
  
  const nomeCompra = route.params?.compra.nome;
  const timestampCompra = route.params?.compra.timestamp;
  const nomeCompraCompleto = mensagemCompra?.replace('$NOME', nomeCompra)

  useEffect(() => {
    setExibirMensagem(!!nomeCompra)

    let timeout;
    if(nomeCompra){
      timeout = setTimeout(() => {
        setExibirMensagem(false);
      }, 3000)
    }

    return () => clearTimeout(timeout);
  }, [timestampCompra]);

  const TopoLista = () => {
    return <>
      <Topo melhoresProdutores={melhoresProdutores} />
      { exibirMensagem && <Text style={estilos.compra}>{nomeCompraCompleto}</Text>}
      <Text style={estilos.titulo}>{tituloProdutores}</Text>
    </>
  }

  return <FlatList
    data={lista}
    renderItem={
      ({ item }) => <Produtor {...item} aoPressionar={() => {
        navigation.navigate('Produtor', item);
      }} />
    }
    keyExtractor={({ nome }) => nome}
    ListHeaderComponent={TopoLista}
    style={estilos.lista} />
}

const estilos = StyleSheet.create({
  lista: {
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 20,
    lineHeight: 32,
    marginHorizontal: 16,
    marginTop: 16,
    fontWeight: 'bold',
    color: '#464646',
  },
  compra: {
    backgroundColor: '#EAF5F3',
    padding: 16,
    color: "#464646",
    fontSize: 16,
    lineHeight: 26
  }
})
