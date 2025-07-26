
export function dijkstra(graph, startNode) {
  const distances = {};
  const visited = {};
  const previous = {};

  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[startNode] = 0;

  while (true) {
    let closestNode = null;
    let minDistance = Infinity;
    for (let node in distances) {
      if (!visited[node] && distances[node] < minDistance) {
        closestNode = node;
        minDistance = distances[node];
      }
    }

    if (closestNode === null) break;
    visited[closestNode] = true;

    for (let neighbor in graph[closestNode]) {
      const weight = graph[closestNode][neighbor];
      const newDist = distances[closestNode] + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = closestNode;
      }
    }
  }

  return { distances, previous };
}
