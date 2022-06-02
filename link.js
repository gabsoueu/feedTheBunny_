class Link{
    constructor(bodyA,bodyB)
    {
        //bodyA = ultimo retangulo da corda
        //bodyB = fruta
        var lastlink = bodyA.body.bodies.length-2;
        this.link = Constraint.create({
            bodyA:bodyA.body.bodies[lastlink],
            pointA:{x:0,y:0},
            bodyB:bodyB,
            pointB:{x:0,y:0},
            length:20,
            stiffness:0.02,
        });
        World.add(world,this.link);
    }
}