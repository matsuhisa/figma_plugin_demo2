
if (figma.editorType === 'figma') {
  figma.showUI(__html__);

  figma.ui.onmessage =  (msg: {type: string, count: number}) => {
    if (msg.type === 'create-shapes') {
      console.log('===========');
      const page = figma.currentPage;
      const nodes = page.findAll(node => node.type === 'FRAME');
      console.log(nodes);

      nodes.forEach((node, index) => {
        console.log(node.name);
        (async () => {
          const bytes = await node.exportAsync({
            format: 'PNG',
            constraint: { type: 'SCALE', value: 1 },
          })

          const image = figma.createImage(bytes)
          const rect = figma.createRectangle()

          rect.x = 200
          rect.y = 250 * index

          rect.resize(node.width, node.height)
          rect.fills = [{
            imageHash: image.hash,
            scaleMode: "FILL",
            scalingFactor: 1,
            type: "IMAGE",
          }]
        })();
      });

    }
  };
}

