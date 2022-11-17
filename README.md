Rule! 
============= 
    1. push 할 땐 자신의 branch에만 push 
    2. 작업을 시작할 땐 'git remote update'를 이용하여 원격저장소 업데이트 여부를 확인 후 작업 
    3. develop branch 변경 사항이 있을 경우 'git merge origin/develop'을 이용하여 병합(merge) 후 작업 
    4. commit을 할 땐 'commit-rule.txt' 파일을 확인 후 commit 규칙에 맞게 commit message 작성 
### 자신의 작업 영역 이외의 파일 수정 X, 병합(merge)할 때 '충돌(CONFLICT)' 일어나게 됨
**** 

Branch Rule! 
============= 
> master branch : 최종 완성본을 올리는 브랜치
> develop branch : 개발 브랜치
> feature branch : 기능 개발 브랜치
>   > feature branch 경우 네이밍할 때 각 자신의 영어 약자를 붙여 만듬
>   >   > ex) feature-LJB

Commit Rule! 
============= 
    FEAT : 새로운 기능 커밋 
    FIX : 버그 수정 커밋 
    BUILD : 빌드 관련 파일 수정 커밋 
    CHORE : requirements, gitignore 등 자잘한 파일 수정 
    CI : CI관련 설정 수정에 대한 커밋 
    DOCS : 문서 수정에 대한 커밋 
    STYLE : 코드 스타일 혹은 포맷 등에 관한 커밋 
    REFACTOR :  코드 리펙토링 커밋, merge 커밋 
    TEST : 테스트 코드 커밋 
****
ex) REFACTOR(own user) : GET own user data to fetch 