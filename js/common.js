// Intersection Observer for section animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100); // Staggered delay
        } else {
             // Optional: remove 'visible' class when not intersecting
             // entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Mobile menu handling
const mobileBtn = document.querySelector('.mobile-menu-btn');
const mainNavUl = document.querySelector('.navbar ul');

if (mobileBtn && mainNavUl) {
    mobileBtn.addEventListener('click', () => {
        mainNavUl.classList.toggle('active');
        // Toggle body scroll lock
        if (mainNavUl.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// Scroll progress handling
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / windowHeight) * 100;
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollProgress + '%';
    }
});

// Highlight active navigation link
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar a');

    console.log('Current Path:', currentPath); // Debugging line

    navLinks.forEach(link => {
        const linkPath = link.href.split('/').pop();
        console.log('Checking Link:', link.textContent, 'Path:', linkPath); // Debugging line
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Neural Background Optimization (Reduce nodes on mobile)
function createNeuralNetwork(svg) {
    const ns = "http://www.w3.org/2000/svg";
    const network = document.getElementById('neural-network');
    
    // Clear previous nodes/lines if function is called again (e.g., on resize if implemented)
    network.innerHTML = ''; 

    const numNodes = window.innerWidth < 768 ? 25 : 40; // Reduce nodes on mobile
    
    const nodes = [];
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * 1440,
            y: Math.random() * 810,
            size: Math.random() < 0.3 ? 'large' : 'small' 
        });
    }
    
    nodes.forEach((node, i) => {
        // Create glow effect
        const glow = document.createElementNS(ns, 'circle');
        glow.setAttribute('cx', node.x);
        glow.setAttribute('cy', node.y);
        glow.setAttribute('r', node.size === 'large' ? 6 : 4);
        glow.setAttribute('fill', 'rgba(255, 255, 255, 0.15)');
        glow.setAttribute('filter', 'blur(2px)');
        
        // Create node
        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', node.size === 'large' ? 2 : 1.5);
        circle.setAttribute('fill', 'rgba(255, 255, 255, 0.8)');
        
        // Add pulsing animation
        const animateNode = document.createElementNS(ns, 'animate');
        animateNode.setAttribute('attributeName', 'r');
        animateNode.setAttribute('values', node.size === 'large' ? '2;3.5;2' : '1.5;2.5;1.5');
        animateNode.setAttribute('dur', node.size === 'large' ? '4s' : '3s');
        animateNode.setAttribute('begin', `${Math.random() * 2}s`); 
        animateNode.setAttribute('repeatCount', 'indefinite');
        
        circle.appendChild(animateNode);
        network.appendChild(glow); 
        network.appendChild(circle);
        
        // Connect nearby nodes (within 300px)
        nodes.forEach((otherNode, j) => {
            if (i < j) {
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 300) {
                    const line = document.createElementNS(ns, 'line');
                    line.setAttribute('x1', node.x);
                    line.setAttribute('y1', node.y);
                    line.setAttribute('x2', otherNode.x);
                    line.setAttribute('y2', otherNode.y);
                    line.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
                    line.setAttribute('stroke-width', '0.5');
                    
                    const animateLine = document.createElementNS(ns, 'animate');
                    animateLine.setAttribute('attributeName', 'stroke-opacity');
                    animateLine.setAttribute('values', '0.05;0.2;0.05');
                    animateLine.setAttribute('dur', '4s');
                    animateLine.setAttribute('begin', `${Math.random() * 4}s`);
                    animateLine.setAttribute('repeatCount', 'indefinite');
                    
                    line.appendChild(animateLine);
                    network.insertBefore(line, network.firstChild); 
                }
            }
        });
    });
}
// Call the function on initial load
// createNeuralNetwork(document.querySelector('.neural-background svg')); // This line is already in index.html 