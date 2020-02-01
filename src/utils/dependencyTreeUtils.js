export function getDependencyTreeIds(node){
   const ids = []
   traverseAndCollectIds(node, ids);
   return ids;
}

function traverseAndCollectIds(node, ids){
    if(!node){
        return;
    }
    ids.push(node.projectId);
    if(node.dependencies){
        for (const c of node.dependencies) {
            traverseAndCollectIds(c, ids);    
        }
    }
}