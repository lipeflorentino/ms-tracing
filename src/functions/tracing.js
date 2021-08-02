export const getTracing = () => {

  const graph = Graph();
  graph.addEdge("a", "b");
  graph.addEdge("b", "c");
  let serialized = graph.serialize();

  return { graph: serialized };
};